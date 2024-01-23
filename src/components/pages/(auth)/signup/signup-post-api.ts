import { _getUrl } from "@/api/api-provider";

export const SignUpPostRequest = async (url: string, { arg }: { arg: { username: string, password: string, email: string } }) => {
    const formData = new URLSearchParams();
    formData.append('username', arg.username);
    formData.append('email', arg.email);
    formData.append('password', arg.password);
    const response = await fetch(_getUrl(url), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    });
    return response;
};
