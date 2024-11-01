import { faker } from "@faker-js/faker";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DataItem } from "../types/Table";

export const generateFakeData = (): DataItem[] => {
	const data = [];
	for (let i = 0; i < 5000; i++) {
		const hour = (i * 3) % 24;
		const activity = faker.company.name();
		data.push({ time: `${hour}:00`, activity });
	}
	return data;
};

export const daysOfWeek: string[] = [
	"شنبه",
	"یکشنبه",
	"دوشنبه",
	"سه‌شنبه",
	"چهارشنبه",
	"پنج‌شنبه",
	"جمعه",
];

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
