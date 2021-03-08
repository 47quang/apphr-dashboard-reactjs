import QTable from "src/components/table/Table";
import { TheHeader } from "src/layouts";

// shortname, name, startCC, endCC, coefficient
const columnDef = [
  { name: 'shortname', title: 'Mã ca làm' },
  { name: 'name', title: 'Tên ca làm' },
  { name: 'startCC', title: 'Giờ Check-in' },
  { name: 'endCC', title: 'Giờ Check-out' },
  { name: 'coefficient', title: 'Hệ số giờ làm' },
]

const data = [
  {
    id: 1,
    shortname: 'SA1',
    name: 'Ca sáng 1',
    startCC: '08:30',
    endCC: '14:30',
    coefficient: 1,
  },
  {
    id: 2,
    shortname: 'SA1',
    name: 'Ca sáng 1',
    startCC: '08:30',
    endCC: '14:30',
    coefficient: 1,
  },
  {
    id: 3,
    shortname: 'SA1',
    name: 'Ca sáng 1',
    startCC: '08:30',
    endCC: '14:30',
    coefficient: 1,
  },
  {
    id: 4,
    shortname: 'SA1',
    name: 'Ca sáng 1',
    startCC: '08:30',
    endCC: '14:30',
    coefficient: 1,
  },
  {
    id: 5,
    shortname: 'SA1',
    name: 'Ca sáng 1',
    startCC: '08:30',
    endCC: '14:30',
    coefficient: 1,
  },
  {
    id: 6,
    shortname: 'SA1',
    name: 'Ca sáng 1',
    startCC: '08:30',
    endCC: '14:30',
    coefficient: 1,
  },
  {
    id: 7,
    shortname: 'SA1',
    name: 'Ca sáng 1',
    startCC: '08:30',
    endCC: '14:30',
    coefficient: 1,
  },
];


const Shifts = () => {
  return <>
    <TheHeader />
    <QTable columnDef={columnDef} data={data}></QTable>
  </>
};
export default Shifts;
