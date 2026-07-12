import SidebarMenu from "@/components/panel/SidebarMenu";

interface PanelLayoutProps {
    children: React.ReactNode;
}
export default function PanelLayout({ children }: PanelLayoutProps) {
    return (
        <html>
            <body className="flex flex-row gap-3 p-3">
                <div className="w-full lg:w-1/6">
                    <SidebarMenu />
                </div>
                <div className="w-full lg:w-5/6">{children}</div>
            </body>
        </html>
    );
}
