// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

// تولید داده‌های جعلی
const generateFakeData = () => {
	const data = [];
	for (let i = 0; i < 10; i++) {
		data.push({
			id: faker.string.uuid(),
			date: faker.date.soon(5).toISOString().split("T")[0],
			time: faker.date
				.recent()
				.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
			activity: faker.hacker.phrase(),
		});
	}
	return data;
};

// ایجاد تابع برای دسته‌بندی داده‌ها بر اساس تاریخ و زمان
const groupDataByDateAndTime = (data) => {
	const groupedData = {};
	data.forEach(({ date, time, activity }) => {
		if (!groupedData[date]) groupedData[date] = {};
		groupedData[date][time] = activity;
	});
	return groupedData;
};

const ActivityTable = () => {
	const [data, setData] = useState([]);
	const [groupedData, setGroupedData] = useState({});

	useEffect(() => {
		const fakeData = generateFakeData();
		setData(fakeData);
		setGroupedData(groupDataByDateAndTime(fakeData));
	}, []);

	// تاریخ‌ها و زمان‌های یکتا را استخراج می‌کنیم
	const uniqueDates = Object.keys(groupedData);
	const uniqueTimes = [...new Set(data.map((item) => item.time))];

	return (
		<div>
			<h1>Activity Schedule</h1>
			<table border={1}>
				<thead>
					<tr>
						<th>Time / Date</th>
						{uniqueDates.map((date) => (
							<th key={date}>{date}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{uniqueTimes.map((time) => (
						<tr key={time}>
							<td>{time}</td>
							{uniqueDates.map((date) => (
								<td key={date + time}>
									{groupedData[date] && groupedData[date][time]
										? groupedData[date][time]
										: "-"}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ActivityTable;
