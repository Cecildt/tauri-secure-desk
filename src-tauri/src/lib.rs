#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
use powershell_script::PsScriptBuilder;
use serde::Deserialize;
use serde::Serialize;
use winreg::enums::HKEY_LOCAL_MACHINE;
use winreg::RegKey;

#[derive(Deserialize, Serialize, Debug)]
struct Application {
    name: String,
    version: String,
    publisher: String,
    installDate: String,
}

#[derive(Deserialize, Serialize, Debug)]
struct OSInfo {
    OsName: String,
    WindowsVersion: String,
    WindowsEditionId: String,
    WindowsBuildLabEx: String,
    WindowsInstallationType: String,
    WindowsCurrentVersion: String,
    OSDisplayVersion: String,
    OsArchitecture: String,
    CsDomain: String,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // tauri::Builder::default()
    //     .plugin(tauri_plugin_fs::init())
    //     .plugin(tauri_plugin_opener::init())
    //     .invoke_handler(tauri::generate_handler![greet])
    //     .run(tauri::generate_context!())
    //     .expect("error while running tauri application");

    // tauri_build::build()
    //     .run(|app| {
    //         app.add_plugin(tauri_plugin_process::init());
    //         app.add_plugin(tauri_plugin_shell::init());
    //         app.add_plugin(tauri_plugin_dialog::init());
    //         app.add_invoke_handler(tauri::generate_handler![
    //             get_software_command,
    //             get_os_info_command
    //         ]);
    //     })
    //     .expect("error while running tauri application");

    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            get_software_command,
            get_os_info_command
        ])
        // .invoke_handler(tauri::generate_handler![get_os_info_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_software_command() -> Vec<Application> {
    let softwareList = windows_get_installed_software_regedit();

    softwareList
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

    software.sort_by(|a, b| a.name.cmp(&b.name));

    println!("software: {:#?}", software);
    software
}

#[tauri::command]
fn get_os_info_command() -> OSInfo {
    let info = os_info_powershell();
    println!("os_info: {:#?}", info);
    info
}

fn os_info_powershell() -> OSInfo {
    let ps = PsScriptBuilder::new()
        .no_profile(true)
        .non_interactive(true)
        .hidden(true)
        .print_commands(false)
        .build();

    // let output = ps.run(r#"Get-ComputerInfo | ConvertTo-Json"#).unwrap();
    // println!("{}", output.stdout().unwrap());

    // Windows Information
    let windowsOutput = ps
        .run(r#"Get-ComputerInfo -Property OsName,WindowsVersion,WindowsEditionId,WindowsBuildLabEx,WindowsInstallationType,WindowsCurrentVersion,OSDisplayVersion,OSArchitecture,CsDomain | ConvertTo-Json"#)
        .unwrap();
    let windows = windowsOutput.stdout().unwrap();

    let windowsInfo: OSInfo = serde_json::from_str(&windows).unwrap();

    // Hardware Information

    windowsInfo
}
