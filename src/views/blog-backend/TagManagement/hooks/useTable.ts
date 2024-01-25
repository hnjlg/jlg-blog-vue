export default function () {
	const tableCols = ref([
		{
			title: '标签id',
			field: 'id',
			minWidth: 200,
		},
		{
			title: '标签名称',
			field: 'tag_name',
			minWidth: 200,
		},
	]);
	return { tableCols };
}
