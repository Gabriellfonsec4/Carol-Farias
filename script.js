const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");

function closeMenu() {
  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("menu-open", open);
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

document.querySelector("#year").textContent = new Date().getFullYear();

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px 40px 0px",
    },
  );

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

const goals = {
  "Começar a treinar":
    "Toda trajetória tem um começo. Conte para a Carol sobre sua rotina e descubra como dar o primeiro passo.",
  "Criar constância":
    "Encontre uma forma de incluir o movimento na sua rotina e converse sobre como manter esse compromisso.",
  "Ganhar força e condicionamento":
    "Compartilhe seus objetivos e conheça as possibilidades de treino com orientação profissional.",
  "Conhecer a consultoria online":
    "Descubra o formato da consultoria online e converse sobre uma orientação que acompanhe sua rotina.",
};

document.querySelectorAll(".goal").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".goal").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    const goal = button.dataset.goal;

    document.querySelector("#goal-title").textContent = goal;
    document.querySelector("#goal-description").textContent = goals[goal];
    document.querySelector("#goal-link").href =
      "https://wa.me/5521986333660?text=" +
      encodeURIComponent(
        "Olá, Carol! Conheci seu site. Meu objetivo é " +
          goal.toLowerCase() +
          ". Pode me contar as opções disponíveis?",
      );
  });
});
