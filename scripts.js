// Cotacao de moedas do dia
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

//Obtendo os elementos do formularios.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente numeros
  amount.addEventListener("input", () => {
  const hasCharactersregex = /\D+/g
  amount.value = amount.value.replace(hasCharactersregex, "")
})

// Captando o evendo de submit (enviar) do formulario.
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

//Funcao para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotacao da moeda selecionada.
   description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
   
    // Calcula o total.
    let total = amount * price 

    // Verifica se o resultado nao e um numero.
    if (isNaN(total)) {
       return alert("Por favor, digita o valor corretamente para converter.")
    }

    // Formatar o valor total.
    total = formatCurrencyBRL(total).replace("R$", "")
    
    // Exibe o resultado total.
    result.textContent = `${total} Reais`

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result")

  } catch (error) {
    // Remove a classe do footer ocultando ele.
    footer.classList.renove("show-result")

    console.log(error)
    alert("Nao foi possivel converter. Tente novamente mais tarde")
  }
}

// Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
  // Converte para numero para utilizar o toLocaleString para formatar o padrao BRL. (R$00,00)
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    
  })
}