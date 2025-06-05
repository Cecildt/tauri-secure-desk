import { invoke } from "@tauri-apps/api";

export interface OS {
    OsName: string,
    WindowsVersion: string,
    WindowsEditionId: string,
    WindowsBuildLabEx: string,
    WindowsInstallationType: string,
    WindowsCurrentVersion: string,
    OSDisplayVersion: string,
    OsArchitecture: string,
    CsDomain: string,
}

export async function getOS(): Promise<OS> {
    let os = await invoke("get_os_info_command") as OS;
    console.log(os);

    return new Promise<any>((resolve) => {
        resolve(os);
    });
}