import { faker } from "@faker-js/faker";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DataItem } from "../types/Table";
import moment from "moment-jalaali";

moment.loadPersian();

let daysOfWeek = [];

for (let i = 0; i < 7; i++) {
	daysOfWeek.push(
		moment()
			.subtract(i + 1, "d")
			.format("YYYY-MM-DD")
	);
}

daysOfWeek = daysOfWeek.reverse();

let daysForDate = [];

for (let i = 0; i < 7; i++) {
	daysForDate.push(
		moment()
			.subtract(i + 1, "d")
			.format("YYYY-MM-DD")
	);
}

daysForDate = daysForDate.reverse();

export const generateFakeData = (): DataItem[] => {
	const data: DataItem[] = [];
	const currentDate = new Date();

	for (let i = 0; i < 5000; i++) {
		const date = new Date(currentDate);
		date.setDate(currentDate.getDate() + Math.floor(i / 8));

		const hour = (i % 8) * 3;
		const time = `${hour}:00`;
		const activity = faker.company.name();

		data.push({
			date: daysForDate[Math.floor(Math.random() * daysForDate.length)],
			time,
			activity,
			id: faker.string.ulid(),
		});
	}

	return data;
};

export const getDaysWithDate = (): string[] => {
	const today = new Date();
	return daysOfWeek.map((day, index) => {
		const date = new Date(today);
		date.setDate(today.getDate() + index);
		return `${day} ${date.getDate()}/${date.getMonth() + 1}`;
	});
};

const useTable = () => {
	const [data, setData] = useState<DataItem[]>([]);
	const memoData = useMemo(() => data, [data]);
	const daysWithDate = getDaysWithDate();

	const createData = useCallback(() => {
		setData(generateFakeData());
	}, []);

	useEffect(() => {
		createData();
		const timerRefrence = setInterval(() => {
			createData();
		}, 5000);

		return () => {
			clearInterval(timerRefrence);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data: memoData, daysWithDate, daysOfWeek };
};

export default useTable;
