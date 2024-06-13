import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Doughnut,Pie,Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);



const months= ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
interface ChartBarProps {horizontal?: boolean ; title_1: string ; title_2: string; data_1: number[] ; data_2: number[]; labels? : string[] ; bgColor_1 : string; bgColor_2: string};
export const ChatBar = ({horizontal= false,title_1,title_2,data_1=[],data_2=[],labels= months,bgColor_1,bgColor_2}: ChartBarProps) => {
 const options:ChartOptions<"bar"> = {
    responsive: true,
    indexAxis : horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales:{
      y:{
        beginAtZero: true,
        grid:{
          display: false,
        }
      },
      x:{
        grid:{
          display: false,
        }
      }
    }
  };
  const data:ChartData<"bar",number[], string> = {
    labels,
    datasets: [
      {
        label: title_1,
        data: data_1,
        backgroundColor: bgColor_1,
        barPercentage:1,
        categoryPercentage:0.4,
        barThickness: "flex"
      },
      {
        label: title_2,
        data: data_2,
        backgroundColor: bgColor_2,
        barPercentage:1,
        categoryPercentage:0.4,
        barThickness: "flex"
      },
    ],
  };
return <Bar options={options} data={data} />;
}

interface DoughnutChartProps{ labels:string[]; data:number[] ; cutout?:number| string; offset?: number[]; legends?:boolean; backgroundColor:string[]};

export const DoughnutChart = ({labels,data,backgroundColor,offset,cutout,legends=true}:DoughnutChartProps)=>{
const doughnutData:ChartData<"doughnut",number[],string> = {
  labels,
  datasets:[
    {
      data,backgroundColor,borderWidth:0,offset
    }
  ]
};
const doughnutOption:ChartOptions<"doughnut"> = {
  responsive:true,
  plugins:{
    legend:{
      display: legends,
      position: 'bottom',
      labels:{
        padding:40,
      }
    }
  },
  cutout,
};
  return <Doughnut options={doughnutOption} data={doughnutData}/>;
}

interface PieChartProps{labels:string[],data:number[],backgroundColor:string[],offset?: number[]};
export const PieChart=({labels,data,backgroundColor,offset}:PieChartProps)=>{
  const PieData:ChartData<"pie",number[],string>={
    labels,
    datasets:[
      {data,backgroundColor,offset,borderWidth:1}
    ]
  };
  const PieOptions:ChartOptions<"pie"> ={
    responsive:true,
    plugins:{
      legend:{
        display:false
      }
    }
  };
  return <Pie options={PieOptions} data={PieData}/>
}

interface LineChartProps{label:string;backgroundColor:string; data: number[]; borderColor:string; labels?:string[]}

export const LineChar=({label,labels,backgroundColor,data,borderColor}:LineChartProps)=>{
  const LineData:ChartData<"line",number[],string>={
    labels,
    datasets:[
      {
        label,backgroundColor,data,borderColor , fill:true
      }
    ]
  };
  const Lineoption:ChartOptions<"line">={
    responsive:true,
    plugins:{
      legend:{
        display:false
      },
      title:{
        display:false
      }
    },
    scales:{
      y:{
        beginAtZero:true,
        grid:{
          display:false
        }
      },
      x:{
        grid:{
          display:false
        }
      }
    }
  }
return <Line options={Lineoption} data={LineData}/>
}