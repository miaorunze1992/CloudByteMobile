// validators.ts

export const isUsernameValid = (val: string) => {
    return val.trim().length <= 8;
};

export const isPasswordValid = (val: string) => {
    return val.trim().length >= 8 && val.trim().length <= 16;
};