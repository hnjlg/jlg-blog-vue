export default function () {
	const tableCols = ref([
		{
			title: '用户id',
			field: 'id',
			minWidth: 200,
		},
		{
			title: '用户名',
			field: 'user_name',
			minWidth: 200,
		},
		{
			title: '用户类型名称',
			field: 'standing_name',
			minWidth: 200,
		},
		{
			title: '用户密码',
			field: 'pass_word',
			slotName: 'password-slot',
			minWidth: 400,
		},
		// {
		// 	title: '用户Code',
		// 	field: 'user_code',
		// 	minWidth: 300,
		// },
		// {
		// 	title: '用户类型id',
		// 	field: 'user_standing_id',
		// 	minWidth: 300,
		// },

		// {
		// 	title: '用户类型值',
		// 	field: 'standing_value',
		// 	minWidth: 300,
		// },
	]);
	return { tableCols };
}
