import MainWidget from "./mainWidget"
import TabsWidget from "./tabsWidget";

const Dashboard = () => {
    return (
        <div className="px-4 pt-6">
            <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                <MainWidget/>
                <TabsWidget />
            </div>
        </div>
    )
}

export default Dashboard;