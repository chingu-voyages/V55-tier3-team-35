import MonthlyRemaining from '../overview/monthlyRemaining';
import MonthlySpending from '../overview/monthlySpending';
import OverviewTitle from '../overview/overviewTitle';
import TodaySpending from '../overview/todaySpending';

const OverviewTab: React.FC = () => {
  return (
    <div className="px-[16px] py-[24px] lg:py-[32px] lg:px-[40px] mb-[66px] md:mb-0">
      <OverviewTitle />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TodaySpending />
        <MonthlySpending />
        <MonthlyRemaining />
      </div>
    </div>
  );
};

export default OverviewTab;
