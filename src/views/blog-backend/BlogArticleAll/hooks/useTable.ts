export default function () {
	const tableCols = ref([
		{
			title: '文章标题',
			field: 'title',
			minWidth: 300,
		},
		{
			title: '文章状态',
			field: 'status_name',
			width: 100,
		},
		{
			title: '作者',
			field: 'author_name',
			width: 100,
		},
		{
			title: '发表时间',
			field: 'add_time',
			width: 220,
		},
		{
			title: '阅读量',
			field: 'reading_quantity',
			width: 80,
		},
		{
			title: '标签',
			field: 'tags',
			minWidth: 130,
		},
	]);
	return { tableCols };
}
