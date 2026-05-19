
let tools = [

  {
    id: 1,
    name: "Cordless Drill",
    category: "Power Tools",
    owner: "John",
    unit: "3B",
    contact: "09171234567",
    status: "available"
  },

  {
    id: 2,
    name: "Hammer",
    category: "Hand Tools",
    owner: "Marcus",
    unit: "5A",
    contact: "marcus@email.com",
    status: "lent"
  }

];



function addTool() {


  const name = document.getElementById("tool-name").value;
  const category = document.getElementById("tool-category").value;
  const owner = document.getElementById("owner-name").value;
  const unit = document.getElementById("owner-unit").value;
  const contact = document.getElementById("owner-contact").value;


  if (
    name === "" ||
    category === "" ||
    owner === "" ||
    unit === "" ||
    contact === ""
  ) {

    alert("Please fill in all fields.");
    return;
  }

  alert("Tool Added");

  const tool = {

    id: Date.now(),
    name: name,
    category: category,
    owner: owner,
    unit: unit,
    contact: contact,
    status: "available"

  };

  tools.push(tool);

  clearForm();

  displayTools();
}

function clearForm() {

  document.getElementById("tool-name").value = "";
  document.getElementById("tool-category").value = "";
  document.getElementById("owner-name").value = "";
  document.getElementById("owner-unit").value = "";
  document.getElementById("owner-contact").value = "";

}

function displayTools() {

  const toolList = document.getElementById("tool-list");

  const search = document
    .getElementById("search")
    .value
    .toLowerCase();

  const filter = document
    .getElementById("filter-status")
    .value;

  toolList.innerHTML = "";

  const filteredTools = tools.filter(function(tool) {

    const matchSearch =

      tool.name.toLowerCase().includes(search) ||
      tool.owner.toLowerCase().includes(search);

    const matchFilter =

      filter === "all" ||
      tool.status === filter;

    return matchSearch && matchFilter;

  });

  if (filteredTools.length === 0) {

    toolList.innerHTML = "<p>No tools found.</p>";
    return;

  }

  filteredTools.forEach(function(tool) {

    const card = document.createElement("div");

    card.classList.add("tool-card");

    card.innerHTML = `

      <h3>${tool.name}</h3>

      <p><strong>Category:</strong> ${tool.category}</p>

      <p><strong>Owner:</strong> ${tool.owner}</p>

      <p><strong>Unit:</strong> ${tool.unit}</p>

      <p><strong>Contact:</strong> ${tool.contact}</p>

      <p class="status ${tool.status}">
        Status:
        ${tool.status === "available" ? "Available" : "Lent Out"}
      </p>

      <div class="tool-buttons">

        <button
          class="${tool.status === "available"
            ? "lend-btn"
            : "return-btn"}"

          onclick="toggleStatus(${tool.id})">

          ${tool.status === "available"
            ? "Lend Tool"
            : "Return Tool"}

        </button>

        <button
          class="delete-btn"
          onclick="deleteTool(${tool.id})">

          Delete

        </button>

      </div>

    `;

    toolList.appendChild(card);

  });


  updateStats();

}

function toggleStatus(id) {

  tools = tools.map(function(tool) {

    if (tool.id === id) {

      if (tool.status === "available") {

        tool.status = "lent";

      } else {

        tool.status = "available";

      }

    }

    return tool;

  });

  displayTools();

}

function deleteTool(id) {

  tools = tools.filter(function(tool) {

    return tool.id !== id;

  });

  displayTools();

}

function updateStats() {

  const total = tools.length;

  const available = tools.filter(function(tool) {

    return tool.status === "available";

  }).length;

  const lent = tools.filter(function(tool) {

    return tool.status === "lent";

  }).length;

  let rate = 0;

  if (total > 0) {

    rate = Math.round((lent / total) * 100);

  }

  document.getElementById("total").textContent = total;

  document.getElementById("available").textContent = available;

  document.getElementById("lent").textContent = lent;

  document.getElementById("rate").textContent = rate + "%";

}

displayTools();