import React from "react";
import { FixedSizeList as List } from "react-window";
import { trunc } from "../../helpers/props";
import useTable from "../../hooks/useTable";
import clock from "../../assets/3481226.png";
import moment from "moment-jalaali";
moment.loadPersian();

const ScheduleTable: React.FC = () => {
	const { data, daysWithDate, daysOfWeek } = useTable();

	const renderRow = ({
		index,
		style,
	}: {
		index: number;
		style: React.CSSProperties;
	}) => (
		<tr style={style}>
			{/* <td className="time-td">{index % 3 === 0 ? data[index].time : ""}</td> */}
			<td className="time-td">{data[index].time}</td>

			{daysOfWeek.map((_, i) => {
				let tlt = "-";
				if (data[index]?.date === _) {
					tlt = data[index].activity;
				}
				return (
					<td
						key={`day-${i}`}
						className={`${i + 1 === daysOfWeek.length ? "border-left-0" : ""}`}
						title={tlt}
					>
						{trunc(tlt, 25)}
					</td>
				);
			})}
		</tr>
	);

	return (
		<div className="table-container">
			<table>
				<thead>
					<tr>
						<th className="time-th">
							<div className="icon-wrapper">
								<img src={clock} />
							</div>
						</th>
						{daysWithDate.map((day, index) => (
							<th key={index}>
								{moment(day, "YYYY-MM-DD").format("jMM/jDD dddd")}
							</th>
						))}
					</tr>
				</thead>
				<List
					outerElementType={"tbody"}
					height={600}
					itemCount={data.length}
					itemSize={40}
					width="100%"
				>
					{renderRow}
				</List>
			</table>
		</div>
	);
};

export default ScheduleTable;
