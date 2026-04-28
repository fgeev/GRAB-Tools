async function forceDownload(level_id) {
    const [user_id, map_id, iter] = level_id.split(':');
    const iteration = iter || "1";

    const fileUrl = `https://grab-images.slin.dev/level_${user_id}_${map_id}_${iteration}.level`;

    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            window.toast('Force download failed', 'warning');
            return;
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${level_id}.level`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);
        window.toast('Force download complete', 'success');
    } catch (e) {
        window.toast('Force download error', 'warning');
    }
}
