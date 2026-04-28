import { download_level_request } from '@/requests/DownloadLevelRequest';
import { level_details_request } from '@/requests/LevelDetailsRequest';

async function can_download_level(level_id: string) {
    // Always allow downloads
    return true;
}

async function download_level(level_id: string) {
    const [user_id, map_id, iter] = level_id.split(':');
    let iteration = iter;

    // If iteration missing, fetch it
    if (iteration === undefined) {
        const details = await level_details_request(level_id);
        if (details === null) return null;

        iteration = String(details.iteration);
    }

    const download_id = [user_id, map_id, iteration].join(':');

    // Actually download the level
    const level = await download_level_request(download_id);

    return level;
}

async function try_download_level(level_id: string) {
    // Support URLs like ?level=xxxx
    if (level_id.includes('level=')) {
        const params = new URLSearchParams(level_id.split('?')[1]);
        const level = params.get('level');
        if (!level) {
            window.toast('Invalid level url', 'warning');
            return null;
        }
        level_id = level;
    }

    // Always true now
    if (await can_download_level(level_id)) {
        return await download_level(level_id);
    }

    return null;
}

export default {
    download_level,
    can_download_level,
    try_download_level,
};
