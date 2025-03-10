import "./globals.css";

export const metadata = {
    title: "Inicio | Chat Dev",
    description: "Chat de inteligencia artificial para desarrolladores",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content h-screen">
                        {/* Page content here */}
                        <label
                            htmlFor="my-drawer-2"
                            className="btn btn-primary drawer-button lg:hidden"
                        >
                            Open drawer
                        </label>
                        {children}
                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            {/* Sidebar content here */}
                            <li>
                                <a>chats...</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </body>
        </html>
    );
}
