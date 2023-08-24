import { ss } from '../../../utils/storage'
const LOCAL_NAME = 'AIStorage'

// 返回一个对象，其中包含当前活动的对话框 ID、是否正在使用上下文、历史对话列表和聊天记录
export function defaultState(): Chat.ChatState {
    const uuid = 1002
    return {
        active: uuid,
        usingContext: true,
        history: [{ uuid, title: 'New Chat', isEdit: false }],
        chat: [{ uuid, data: [] }],
    }
}
// 从本地存储中获取状态
export function getLocalState(): Chat.ChatState {
    // 获取存储中的值
    const localState = ss.get(LOCAL_NAME);

    // 如果没有找到值，则返回默认状态
    if (!localState) {
        return defaultState();
    }

    // 否则返回找到的值
    return { ...defaultState(), ...localState };
}

// 将状态保存到本地存储中
export function setLocalState(state: Chat.ChatState) {
    ss.set(LOCAL_NAME, state);
}