
use tauri::Manager;
// #[cfg(target_os = "macos")]
pub fn run() {

    tauri::Builder::default()
        .setup(|app| {
            let webview_window = app.get_webview_window("main").unwrap();

            let _ = webview_window.set_ignore_cursor_events(true);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
