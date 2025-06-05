import { invoke } from "@tauri-apps/api";

export interface Application {
    name: string;
    version: string;
    publisher: string;
    installDate: string;
}

export async function getApplications(): Promise<Application[]> {

    let applications = invoke("get_software_command");

    return new Promise<any>((resolve) => {
        resolve(applications);
    });
}