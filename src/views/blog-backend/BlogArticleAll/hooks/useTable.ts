export default function () {
	const tableCols = ref([
		{
			title: '文章标题',
			field: 'title',
			width: 300,
		},
		{
			title: '文章内容',
			field: 'content',
			width: 300,
		},
		{
			title: '作者',
			field: 'author',
			width: 100,
		},
		{
			title: '发表时间',
			field: 'time',
			width: 130,
		},
		{
			title: '阅读量',
			field: 'reading_quantity',
			width: 80,
		},
	]);
	return { tableCols };
}
