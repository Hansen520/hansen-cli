/*
 * @Date: 2023-10-11 13:53:06
 * @Description: 这个主要是针对antd的Form表单的验证
 */

import { trim } from 'lodash-es';

/* 
  正则表达式的参考案例
  数字：^[0-9]*$
  n位的数字：^\d{n}$
  至少n位的数字：^\d{n,}$
  m-n位的数字：^\d{m,n}$
  零和非零开头的数字：^(0|[1-9][0-9]*)$
  非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(\.[0-9]{1,2})?$
  带1-2位小数的正数或负数：^(\-)?\d+(\.\d{1,2})$
  正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$
  有两位小数的正实数：^[0-9]+(\.[0-9]{2})?$
  有1~3位小数的正实数：^[0-9]+(\.[0-9]{1,3})?$
  非零的正整数：^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$
  非零的负整数：^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$
  非负整数：^\d+$ 或 ^[1-9]\d*|0$
  非正整数：^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$
  非负浮点数：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
  非正浮点数：^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
  正浮点数：^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
  负浮点数：^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
  浮点数：^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$

  汉字：^[\u4e00-\u9fa5]{0,}$
  英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$
  长度为3-20的所有字符：^.{3,20}$
  由26个英文字母组成的字符串：^[A-Za-z]+$
  由26个大写英文字母组成的字符串：^[A-Z]+$
  由26个小写英文字母组成的字符串：^[a-z]+$
  由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
  由数字、26个英文字母或者下划线组成的字符串：^\w+$ 或 ^\w{3,20}$
  中文、英文、数字包括下划线：^[\u4E00-\u9FA5A-Za-z0-9_]+$
  中文、英文、数字但不包括下划线等符号：^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$
  可以输入含有^%&',;=?$\"等字符：[^%&',;=?$\x22]+
  禁止输入含有~的字符：[^~]+

  Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
  域名：[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?
  InternetURL：[a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$
  手机号码：^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$
  电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$
  国内电话号码(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7}
  电话号码正则表达式（支持手机号码，3-4位区号，7-8位直播号码，1－4位分机号）: ((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)
  身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X：(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)
  帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
  密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
  强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$
  强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$
  日期格式：^\d{4}-\d{1,2}-\d{1,2}
  一年的12个月(01～09和1～12)：^(0?[1-9]|1[0-2])$
  一个月的31天(01～09和1～31)：^((0?[1-9])|((1|2)[0-9])|30|31)$
  钱的输入格式：
    有四种钱的表示形式我们可以接受:"10000.00" 和 "10,000.00", 和没有 "分" 的 "10000" 和 "10,000"：^[1-9][0-9]*$
    这表示任意一个不以0开头的数字,但是,这也意味着一个字符"0"不通过,所以我们采用下面的形式：^(0|[1-9][0-9]*)$
    一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：^(0|-?[1-9][0-9]*)$
    这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧。下面我们要加的是说明可能的小数部分：^[0-9]+(.[0-9]+)?$
    必须说明的是,小数点后面至少应该有1位数,所以"10."是不通过的,但是 "10" 和 "10.2" 是通过的：^[0-9]+(.[0-9]{2})?$
    这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：^[0-9]+(.[0-9]{1,2})?$
    这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$
    1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$
    备注：这就是最终结果了,别忘了"+"可以用"*"替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
  xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$
  中文字符的正则表达式：[\u4e00-\u9fa5]
  双字节字符：[^\x00-\xff] (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))
  空白行的正则表达式：\n\s*\r (可以用来删除空白行)
  HTML标记的正则表达式：<(\S*?)[^>]*>.*?|<.*? /> ( 首尾空白字符的正则表达式：^\s*|\s*$或(^\s*)|(\s*$) (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)
  腾讯QQ号：[1-9][0-9]{4,} (腾讯QQ号从10000开始)
  中国邮政编码：[1-9]\d{5}(?!\d) (中国邮政编码为6位数字)
  IPv4地址：((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}

*/

/* 基本的请求校验 */
export const required = (msg: string, flag: boolean = true) => {
  return {
    required: flag,
    message: msg,
  };
};

/* 最大字符 */
export const max = (num: number, msg: string) => {
  return {
    max: num,
    message: msg,
  };
};

/* 最少字符 */
export const min = (num: number, msg: string) => {
  return {
    min: num,
    message: msg,
  };
};

/* 邮箱的校验 */
export const checkEmail = () => {
  return {
    pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    message: '请输入正确的邮箱',
  };
};

/* 金额价格的校验，保留2位小数金额 */
export const checkPrice = (str: string) => {
  return {
    pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
    message: '请输入正确的价格',
  };
};

/* 验证码校验 */
export const verifyCode = () => {
  return {
    pattern: /^\d{6}$/,
    message: '验证码必须是6位数字',
  };
};

/* 身份证号码 */
export const IdNo = () => {
  return {
    pattern:
      // eslint-disable-next-line max-len
      /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
    message: '请输入正确的身份证号!',
  };
};

/* 银行卡校验 */
export const account = () => {
  return {
    // pattern: /^[1-9](\d{8}|\d{15}|\d{17}|\d{19})$/,
    pattern: /^[1-9]\d{12,18}$/,
    message: '请输入正确的银行卡号!',
  };
};

/* 验证护照 */
export const checkPassport = () => {
  return {
    pattern: /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g,
    message: '请输入正确的护照',
  };
};

/* 统一社会信用代码 */
export const TaxNo = () => {
  return {
    pattern: /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/,
    message: '请输入正确的统一社会信用代码!',
  };
};

/* 手机号码的校验 */
export const verifyPhone = () => {
  return {
    pattern: /^1\d{10}$/,
    message: '请输入正确的手机号',
  };
};

/* 字符长度校验 */
export const verifyEmpty = (minsize: number, maxsize: number) => {
  return {
    validator: (rule: string, value: string) => {
      if (minsize > 0 && value && value.length !== trim(value).length && trim(value).length < minsize) {
        return Promise.reject(`输入的内容少于${minsize}位`);
      }
      if (maxsize > 0 && value && value.length !== trim(value).length && trim(value).length > maxsize) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`输入的内容大于${maxsize}位`);
      }
      return Promise.resolve();
    },
  };
};

/* 非空校验 */
export const hasEmpty = (str = '请不要输入空字符') => {
  return {
    validator: (rule: string, value: string) => {
      if (/\s+/g.test(value)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(str);
      }
      return Promise.resolve();
    },
  };
};

/* 密码强度校验 */
export const password = () => {
  return {
    pattern: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
    message: '密码强度太弱,必须包含大小写字母、数字、特殊字符',
  };
};



/* 只限汉字字符 */
export const checkChinese = (str = '请输入中文') => {
  return {
    pattern: /^[\u4e00-\u9fa5]{0,}$/,
    message: str,
  };
};
