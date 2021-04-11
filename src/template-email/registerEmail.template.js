const registerEmail = (translate, greetings, username, code) => `
  <div style="background-color: #DCDCDC; display: block; padding: 24px; text-align: center;">
    <h3 style="background-color: ##2F4F4F; color: white;">${translate("email.register.header", { greetings, name: username })}</h3>
    <div style="background-color: white; text-align: left; padding: 16px; margin: 0 auto; max-width: 500px;">
      <p>${translate("email.register.message", { code: "<b>" + code + "</b>" })}</p>
      <footer>${translate("email.signature", { link: "<a href=\"http://localhost:3000\">WeLiftUP</a>" })}</footer>
    </div>
  </div>
`

export default registerEmail
