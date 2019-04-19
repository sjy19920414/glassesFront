const exeStatus=[
    {"value":"IN_PROCESS","name":"exeState.IN_PROCESS"},
    {"value":"FINISH","name":"exeState.FINISH"},
    {"value":"EXCEPTION","name":"exeState.EXCEPTION"},
    {"value":"RESEND","name":"exeState.RESEND"}

];
const status=[
    {"value":"A","name":"status.available"},
    {"value":"D","name":"status.del"}
];
const protocol=[
    {"value":"http","name":"HTTP"},
    {"value":"https","name":"HTTPS"}
];
const methods=[
    {"value":"post","name":"POST"},
    {"value":"get","name":"GET"}
];

const trueOrFalse=[
    {"value":"false","name":"common.no"},
    {"value":"true","name":"common.yes"}
];

export default {
    exeStatus,
    status,
    protocol,
    methods,
    trueOrFalse
}