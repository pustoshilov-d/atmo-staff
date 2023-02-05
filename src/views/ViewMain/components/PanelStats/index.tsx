import { Group, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import { FC } from 'react'
import { Bar } from 'react-chartjs-2'
import { iPanelStatsProps } from '../types'
import "@shared/extlibs/chartjs"

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 10),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => 20),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

export const PanelStats: FC<iPanelStatsProps> = ({ setActivePanel, goHome, stats, ...rest }) => (
  <Panel {...rest}>
    <PanelHeader separator={false} before={<PanelHeaderBack onClick={goHome} />}>
      Статистика
    </PanelHeader>
    <Group>
      <Bar options={options} data={data} />;
    </Group>
  </Panel>
)
