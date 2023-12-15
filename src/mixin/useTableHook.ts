export default function (callBack: () => void) {
	const paginationInfo = ref({
		pageIndex: 1,
		pageSize: 30,
	});
	const total = ref(0);

	// 页大小改变
	const handleSizeChange = (val: number) => {
		console.log(`${val} items per page`);
		paginationInfo.value.pageSize = val;
		callBack();
	};

	// 当前页改变
	const handleCurrentChange = (val: number) => {
		console.log(`current page: ${val}`);
		paginationInfo.value.pageIndex = val;
		callBack();
	};

	// 刷新接口
	function restInitPage() {
		callBack();
	}
	return {
		paginationInfo,
		total,
		handleSizeChange,
		handleCurrentChange,
		restInitPage,
	};
}
