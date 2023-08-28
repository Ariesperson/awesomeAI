// 声明命名空间 Chat
declare namespace Chat {
    // 定义聊天对象
    interface Chat {
      dateTime: string;  // 消息发送时间
      text: string;      // 消息文本
      inversion?: boolean;// 消息是否为翻转过的
      error?: boolean;   // 消息是否为错误信息
      loading?: boolean; // 消息是否正在加载中
      conversationOptions?: ConversationRequest | null; // 下一轮对话选项
      requestOptions: {
        prompt: string;    // 对话框提示文本
        options?: ConversationRequest | null; // 下一轮对话选项
      };
    }
  
    // 定义历史记录
    interface History {
      title: string;     // 标题
      isEdit: boolean;   // 是否为编辑状态
      uuid: number;      // 唯一标识符
    }
  
    // 定义聊天状态
    interface ChatState {
      active: number | null;            // 活动的对话 ID
      usingContext: boolean;           // 是否在使用上下文
      history: History[];              // 聊天历史记录
      chat: { uuid: number; data: Chat[] }[]; // 用户聊天列表
    }
  
    // 定义对话请求
    interface ConversationRequest {
      conversationId?: string;        // 会话 ID
      parentMessageId?: string;       // 父消息 ID
    }
  
    // 定义对话响应
    interface ConversationResponse {
      conversationId: string;         // 会话 ID
      detail: {
        choices: {
          finishReason: string; // 结束原因
          index: number;        // 选择索引
          logProbs: any;         // 选择概率
          text: string;         // 选择文本
        }[];
        created: number;             // 创建时间
        id: string;                  // 响应 ID
        model: string;               // 模型名称
        object: string;              // 对象名称
        usage: {
          completionTokens: number; // 完成令牌数量
          promptTokens: number;     // 提示令牌数量
          totalTokens: number;      // 总令牌数量
        };
      };
      id: string;                      // 请求 ID
      parentMessageId: string;         // 父消息 ID
      role: string;                    // 角色
      text: string;                    // 回复文本
    }
  }
  