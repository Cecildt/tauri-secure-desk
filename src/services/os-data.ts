
interface OS {
    name: string;
}

export async function getOS(): Promise<OS> {
    // let os = await invoke("get_os_command");
    let os = { name: "Windows 11" } as OS;
    return new Promise<any>((resolve) => {
        resolve(os);
    });
}