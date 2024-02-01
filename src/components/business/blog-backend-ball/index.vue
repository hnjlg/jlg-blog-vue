<template>
	<floating-ball ref="floatingBallRef" v-model:el-right="ballElRight" v-model:el-bottom="ballElBottom">
		<div :class="{ 'size-transition': true, 'drag-ball': isBallShow, 'message-window': !isBallShow }">
			<el-icon v-if="isBallShow" @click="isBallShow = false"><ChatLineRound /></el-icon>
			<div v-if="!isBallShow" class="chat-container">
				<div v-if="!isBallShowComNex">
					<header>
						<span>联系</span>
						<el-icon @click="isBallShow = true"><SemiSelect /></el-icon>
					</header>
					<main>
						<div class="contact-list">
							<div
								v-for="people in onlinePeoples"
								:key="people.id"
								:class="{ 'contact-list-item': true, 'is-current-people': currentUser.id === people.id }"
								@click="() => peopleClick(people)"
							>
								<el-tag> {{ AT_UserStanding[people.standing] }}</el-tag>
								<span class="user-name">{{ people.user_name }}</span>
							</div>
						</div>
						<div class="chat-window">
							<div v-for="(msg, index) in messageList" :key="msg.id">
								<div
									:id="index + 1 === messageList.length ? 'is-last-msg' : ''"
									:class="['msg-item', msg.sendUserCode === currentUser.user_code ? 'flex-end' : 'flex-start']"
								>
									<div :class="[msg.sendUserCode === currentUser.user_code ? 'is-own-msg' : 'is-not-own-msg']">
										{{ msg.msg }}
									</div>
								</div>
							</div>
							<footer>
								<el-input
									v-model="connectionMessage"
									maxlength="200"
									placeholder=""
									show-word-limit
									type="textarea"
									resize="none"
									@keyup.enter="sendMsg"
								/>
								<el-button type="primary" plain :disabled="!connectionMessage" @click="sendMsg">发送</el-button>
							</footer>
						</div>
					</main>
				</div>
			</div>
		</div>
	</floating-ball>
</template>

<script setup lang="ts">
import FloatingBall from '@/components/floating-ball/index.vue';
import { ChatLineRound, SemiSelect } from '@element-plus/icons-vue';
import { AT_UserLoginResponse, AT_UserStanding } from '@/apiType/production/result';
import { socketIo } from '@/mixin/useSocketHook';

defineOptions({
	name: 'BlogBackendBall',
});

const floatingBallRef = ref();

const connectionMessage = ref<string>('');

const isBallShow = ref<boolean>(true);

const ballElRight = ref<number>(100);

const ballElBottom = ref<number>(100);

const isBallShowComNex = ref(isBallShow.value);

socketIo.value?.emit('reqOnlinePeoples');

socketIo.value?.on('resOnlinePeoples', (data: AT_UserLoginResponse[]) => {
	console.log(data, 'resOnlinePeoples');
	onlinePeoples.value = data.map((user) => JSON.parse(user));
	currentUser.value = onlinePeoples.value[0] ?? {};
});

const onlinePeoples = ref<AT_UserLoginResponse[]>([]);

const currentUser = ref<AT_UserStanding>({});

const messageList = ref<{ msg: string; id: number; sendUserCode: string }[]>([
	{
		msg: '1',
		id: 1,
		sendUserCode: 'U20231208141520',
		receiveUserCode: 'U20231208142555',
	},
	{ msg: '2', id: 2, sendUserCode: 'U20231208141520', receiveUserCode: 'U20231208142555' },
	{ msg: '3', id: 3, sendUserCode: 'U20231208141520', receiveUserCode: 'U20231208142555' },
	{ msg: '4', id: 4, sendUserCode: 'U20231208141520', receiveUserCode: 'U20231208142555' },
	{ msg: '55555555555555555555555555555555', id: 5, sendUserCode: 'U20231208142555', receiveUserCode: 'U20231208141520' },
	{ msg: '66666666666666666666666666666666666666666666666666', id: 6, sendUserCode: 'U20231208141520', receiveUserCode: 'U20231208142555' },
	{ msg: '7777777777777777777777777777777777777777777777777777777777', id: 7, sendUserCode: 'U20231208142555', receiveUserCode: 'U20231208141520' },
	{ msg: '88888888888888888888888888888888888888', id: 8, sendUserCode: 'U20231208141520', receiveUserCode: 'U20231208142555' },
	{ msg: '9999999999999999999999999999999999999999999', id: 9, sendUserCode: 'U20231208141520', receiveUserCode: 'U20231208142555' },
]);

const scrollMsgBottomShow = () => {
	nextTick(() => {
		document.getElementById('is-last-msg')?.scrollIntoView({
			behavior: 'smooth',
		});
	});
};

const clearInputMsgValue = () => {
	connectionMessage.value = '';
};

const sendMsg = () => {
	messageList.value.push({
		id: messageList.value.length + 1,
		msg: connectionMessage.value,
		sendUserCode: 'aa',
	});
	clearInputMsgValue();
	scrollMsgBottomShow();
};

const peopleClick = (people) => {
	currentUser.value = people;
	clearInputMsgValue();
	scrollMsgBottomShow();
};

watch(
	() => isBallShow.value,
	(newVal) => {
		setTimeout(() => {
			isBallShowComNex.value = newVal;
			floatingBallRef.value.dragendHandle({
				clientX: floatingBallRef.value.startClientX,
				clientY: floatingBallRef.value.startClientY,
				target: {
					clientWidth: floatingBallRef.value.$el.clientWidth,
					clientHeight: floatingBallRef.value.$el.clientHeight,
				},
			});
			scrollMsgBottomShow();
		}, 500);
	}
);
</script>

<style scoped lang="scss">
@import url('@/assets/styles/scroll.scss');

$message-window-height: 520px;
$message-window-width: 600px;
$message-window-header-height: 50px;
$message-window-footer-height: 84px;
$contact-list-width: 168px;
.size-transition {
	transition: all 0.5s;
}
.drag-ball {
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background-color: var(--el-color-primary);
	display: flex;
	justify-content: center;
	align-items: center;

	.el-icon {
		color: #ffffff;
		cursor: pointer;
	}
}

.message-window {
	width: $message-window-width;
	height: $message-window-height;
	box-shadow:
		0 4px 6px rgba(0, 0, 0, 0.1),
		0 1px 3px rgba(0, 0, 0, 0.08);
	background-color: #fff;
	border-radius: 10px;

	.chat-container {
		header {
			height: $message-window-header-height;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 15px;
			border-bottom: 1px solid #f0f0f0;
			.el-icon {
				cursor: pointer;
			}
		}

		main {
			height: calc($message-window-height - $message-window-header-height);
			display: flex;
			position: relative;

			.flex-start {
				justify-content: flex-start;
			}

			.flex-end {
				justify-content: flex-end;
			}
			.contact-list {
				overflow-y: auto;
				width: $contact-list-width;
				border-right: 1px solid #f0f0f0;

				.contact-list-item {
					box-shadow: 0 0 1px rgba(0, 0, 0, 0.459);
					border-radius: 5px;
					margin: 8px;
					cursor: pointer;
					transition: all 0.3s;

					&:hover {
						transform: scale(1.05);
					}

					.user-name {
						word-wrap: break-word;
						word-break: break-all;
					}
				}

				.is-current-people {
					color: var(--el-color-primary);
				}
			}
			.chat-window {
				overflow-y: auto;
				flex: 1;
				padding-bottom: $message-window-footer-height;
				.msg-item {
					display: flex;
					font-size: 12px;
					.is-own-msg {
						margin: 10px 0;
						max-width: calc($message-window-width / 2 + 100px);
						background-color: var(--el-color-primary);
						padding: 8px;
						border-radius: 10px;
						color: #fff;
						word-wrap: break-word;
						word-break: break-all;
					}

					.is-not-own-msg {
						margin: 10px 0;
						padding: 5px;
						max-width: calc($message-window-width / 2 + 100px);
						border: 1px solid var(--el-color-primary);
						color: var(--el-color-primary);
						border-radius: 10px;
						word-wrap: break-word;
						word-break: break-all;
					}
				}

				footer {
					height: $message-window-footer-height;
					display: flex;
					flex-wrap: wrap;
					flex-direction: column;
					align-items: flex-end;
					position: absolute;
					bottom: 0;
					background-color: #fff;
					width: $message-window-width - $contact-list-width;
				}
			}
		}
	}
}
</style>
