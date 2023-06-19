const getProto = Object.getPrototypeOf;
export default function customInstanceof(raw: any, origin: Object): boolean {
    // 如果是一个基本类型直接返回
    if (typeof raw !== "object") return false;
    let _proto = getProto(raw);

    while (true) {
        if (!_proto) return false;
        if (_proto === (origin as any).prototype) return true;
        _proto = getProto(_proto);
    }
}

console.log(customInstanceof([], Array));
