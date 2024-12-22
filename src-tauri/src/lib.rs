
use tauri::Manager;
// #[cfg(target_os = "macos")]
// use cocoa::appkit::NSWindow;
pub fn run() {

    // tauri::Builder::default()
    //     .setup(|app| {
    //         let window = app.get_webview_window("main").unwrap();
    //
    //         #[cfg(target_os = "macos")]
    //         unsafe {
    //             let ns_window = window.ns_window().unwrap() as cocoa::base::id;
    //             // マウスイベントを透過させる
    //             ns_window.setIgnoresMouseEvents_(cocoa::base::YES);
    //         }
    //
    //         window.set_always_on_top(true)?;
    //         window.set_decorations(false)?;
    //         Ok(())
    //     })
    //     .run(tauri::generate_context!())
    //     .expect("errtor while running tauri application");
    tauri::Builder::default()
        .setup(|app| {
            let webview_window = app.get_webview_window("main").unwrap();

            let _ = webview_window.set_ignore_cursor_events(true);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
