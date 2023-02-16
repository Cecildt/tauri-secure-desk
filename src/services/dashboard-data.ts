import { getApplications, Application } from './applications-data';

export interface DashboardData {
    AppsCount: number;
    AppsUpdatesCount: number;
    OSUpdatesCount: number;
}

export async function getDashboardData(): Promise<DashboardData> {
    let applications: Application[] = await getApplications();

    return { AppsCount: applications.length, AppsUpdatesCount: 0, OSUpdatesCount: 0 } as DashboardData;
}