#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
use futures::executor::block_on;
use serde::Deserialize;
use serde::Serialize;
use std::collections::HashMap;
use std::process::Command;
use winreg::enums::*;
use winreg::RegKey;
use wmi::WMIError;
use wmi::{COMLibrary, Variant, WMIConnection, WMIDateTime};

#[derive(Deserialize, Debug)]
struct Win32_OperatingSystem {
    Caption: String,
    Name: String,
    CurrentTimeZone: i16,
    Debug: bool,
    EncryptionLevel: u32,
    ForegroundApplicationBoost: u8,
    LastBootUpTime: WMIDateTime,
}

#[derive(Deserialize, Serialize, Debug)]
struct Application {
    name: String,
    version: String,
    publisher: String,
    installDate: String,
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_software_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_software_command() -> Vec<Application> {
    let softwareList = windows_get_installed_software_regedit();
    println!("get_software_command:");
    windows_get_installed_software_wmi();
    println!("get_software_command: done");

    softwareList

    // let output = Command::new("wmic")
    //     .args(&["cpu", "get", "Name,NumberOfLogicalProcessors", "/format:list"]).output().ok().unwrap();

    // let output = Command::new("wmic")
    //         .args(&["Product",
    //             "get",
    //             "InstallDate,Name,Vendor,Version",
    //             "/format:list"]).output().ok().unwrap();

    // let content = String::from_utf8(output.stdout).ok().unwrap();
    // print!("{}", content);
}

fn windows_get_installed_software_regedit() -> Vec<Application> {
    let mut software: Vec<Application> = Vec::new();
    let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);

    println!("open_subkey: ");
    let key = hklm
        .open_subkey("SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall")
        .unwrap();

    println!("enum_keys: ");
    for subkey in key.enum_keys() {
        let subkey = subkey.unwrap();

        let subkeyResult = key.open_subkey(subkey);

        if subkeyResult.is_err() {
            continue;
        }

        let subkey = subkeyResult.unwrap();

        let nameResult: Result<String, std::io::Error> = subkey.get_value("DisplayName");

        if nameResult.is_err() {
            continue;
        }

        let versionResult: Result<String, std::io::Error> = subkey.get_value("DisplayVersion");

        let version;
        if versionResult.is_err() {
            version = "unknown".to_string();
        } else {
            version = versionResult.unwrap();
        }

        let publisherResult: Result<String, std::io::Error> = subkey.get_value("Publisher");

        let publisher;
        if publisherResult.is_err() {
            publisher = "unknown".to_string();
        } else {
            publisher = publisherResult.unwrap();
        }

        let installDateResult: Result<String, std::io::Error> = subkey.get_value("InstallDate");

        let installDate;
        if installDateResult.is_err() {
            installDate = "unknown".to_string();
        } else {
            installDate = installDateResult.unwrap();
        }

        let app = Application {
            name: nameResult.unwrap(),
            version: version,
            publisher: publisher,
            installDate: installDate,
        };

        software.push(app);
    }

    println!("software: {:#?}", software);
    software
}

fn windows_get_installed_software_wmi() -> Result<(), Box<dyn std::error::Error>> {
    let com_con = COMLibrary::new()?;
    let wmi_con = WMIConnection::new(com_con.into())?;

    println!("execute query: ");
    let result = block_on(exec_async_query(&wmi_con));

    Ok(())
}

async fn exec_async_query(wmi_con: &WMIConnection) -> Result<(), Box<dyn std::error::Error>> {
    println!("async_raw_query: ");
    let results: Vec<HashMap<String, Variant>> = wmi_con
        .async_raw_query("SELECT * FROM Win32_OperatingSystem")
        .await?;

    println!("Results: {0}", results.len());
    for os in results {
        println!("{:#?}", os);
    }

    let results: Vec<Win32_OperatingSystem> = wmi_con.async_query().await?;

    for os in results {
        println!("{:#?}", os);
    }

    Ok(())
}
