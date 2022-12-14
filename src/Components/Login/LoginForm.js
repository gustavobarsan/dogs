import React from "react";
import { Link } from "react-router-dom";
// import URL from "../../api/URL";
import { Input } from "../Forms/Input";
import { Button } from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { TOKEN_POST, USER_GET } from "../../api";
export const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUser(token);
    }
  });

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const res = await fetch(url, options);
    const json = await res.json();
    console.log(json);
  }
  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      });
      const res = await fetch(url, options);
      const json = await res.json();
      console.log(json);
      window.localStorage.setItem("token", json.token);
      getUser(json.token);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />

        <Button>Entrar</Button>
      </form>
      <Link to="criar">Cadastro</Link>
      <Link to="perdeu">Esqueci a Senha</Link>
    </section>
  );
};
