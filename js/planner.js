const starterTasks = [
  {
    id: 1,
    title: "Complete JavaScript assignment",
    course: "COS 106",
    date: "2025-06-18",
    completed: false,
  },
  {
    id: 2,
    title: "Revise data structures notes",
    course: "COS 104",
    date: "2025-06-20",
    completed: true,
  },
  {
    id: 3,
    title: "Prepare group presentation",
    course: "GST 102",
    date: "2025-06-24",
    completed: false,
  },
];

let currentFilter = "all";

let tasks = (() => {
  try {
    const saved = localStorage.getItem("joanna-planner");
    return saved ? JSON.parse(saved) : starterTasks;
  } catch {
    return starterTasks;
  }
})();

function saveTasks() {
  try {
    localStorage.setItem("joanna-planner", JSON.stringify(tasks));
  } catch {}
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function showPlannerToast(message, type = "add") {
  let container = document.getElementById("planner-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "planner-toast-container";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  let iconSvg = `<path d="m5 12 4 4L19 6" />`;
  if (type === "check") {
    iconSvg = `<path d="M12 2c.4 5.7 4.3 9.6 10 10-5.7.4-9.6 4.3-10 10-.4-5.7-4.3-9.6-10-10 5.7-.4 9.6-4.3 10-10Z" />`;
  } else if (type === "delete") {
    iconSvg = `<path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13" />`;
  }

  const toast = document.createElement("div");
  toast.className = "planner-toast";
  toast.innerHTML = `
    <span class="planner-toast-icon">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        ${iconSvg}
      </svg>
    </span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-hide");
    setTimeout(() => {
      toast.remove();
    }, 280);
  }, 2600);
}

function renderPlanner() {
  const dayEl = document.getElementById("planner-day");
  const monthYearEl = document.getElementById("planner-month-year");
  const progressRing = document.getElementById("planner-progress-ring");
  const progressPct = document.getElementById("planner-progress-pct");
  const summaryText = document.getElementById("planner-summary-text");
  const totalBadge = document.getElementById("task-total-badge");
  const taskListEl = document.getElementById("task-list");

  const now = new Date();
  if (dayEl) {
    dayEl.textContent = now.toLocaleDateString("en-GB", { day: "2-digit" });
  }
  if (monthYearEl) {
    monthYearEl.textContent = now.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  }

  const done = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const deg = total ? (done / total) * 360 : 0;
  const pct = total ? Math.round((done / total) * 100) : 0;

  if (progressRing) {
    progressRing.style.setProperty("--progress", `${deg}deg`);
  }
  if (progressPct) {
    progressPct.textContent = `${pct}%`;
  }
  if (summaryText) {
    summaryText.textContent = `${done} of ${total} tasks completed. Keep moving, one task at a time.`;
  }
  if (totalBadge) {
    totalBadge.textContent = String(total);
  }

  if (!taskListEl) return;

  const shown = tasks.filter(
    (t) => currentFilter === "all" || (currentFilter === "done" ? t.completed : !t.completed)
  );

  taskListEl.innerHTML = "";

  if (shown.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "empty-state";
    emptyDiv.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m5 12 4 4L19 6" />
      </svg>
      <strong>All clear</strong>
      <p>No tasks in this view.</p>
    `;
    taskListEl.appendChild(emptyDiv);
    return;
  }

  shown.forEach((task) => {
    const article = document.createElement("article");
    article.className = task.completed ? "task done" : "task";

    const checkBtn = document.createElement("button");
    checkBtn.type = "button";
    checkBtn.className = "task-check";
    checkBtn.setAttribute(
      "aria-label",
      task.completed ? "Mark task active" : "Mark task complete"
    );
    if (task.completed) {
      checkBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m5 12 4 4L19 6" />
        </svg>
      `;
    }
    checkBtn.addEventListener("click", () => {
      const willComplete = !task.completed;
      tasks = tasks.map((t) =>
        t.id === task.id ? { ...t, completed: willComplete } : t
      );
      saveTasks();
      renderPlanner();
      if (willComplete) {
        showPlannerToast("Congratulations", "check");
      }
    });

    const formattedDate = new Date(task.date + "T12:00:00").toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
      }
    );

    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `
      <strong>${escapeHtml(task.title)}</strong>
      <span>
        <b>${escapeHtml(task.course)}</b>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
        ${escapeHtml(formattedDate)}
      </span>
    `;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", `Delete ${task.title}`);
    deleteBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13" />
      </svg>
    `;
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderPlanner();
      showPlannerToast("Successfully deleted", "delete");
    });

    article.appendChild(checkBtn);
    article.appendChild(infoDiv);
    article.appendChild(deleteBtn);
    taskListEl.appendChild(article);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const titleInput = document.getElementById("task-title-input");
  const courseSelect = document.getElementById("task-course-select");
  const dateInput = document.getElementById("task-date-input");
  const errorEl = document.getElementById("task-form-error");
  const filterButtons = document.querySelectorAll("#task-filter-buttons button[data-filter]");

  if (taskForm && titleInput && courseSelect && dateInput && errorEl) {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = titleInput.value;
      const course = courseSelect.value;
      const date = dateInput.value;

      if (!title.trim() || !course || !date) {
        errorEl.textContent = "Please complete all three fields.";
        errorEl.style.display = "block";
        return;
      }

      tasks = [
        {
          id: Date.now(),
          title: title.trim(),
          course,
          date,
          completed: false,
        },
        ...tasks,
      ];
      saveTasks();

      titleInput.value = "";
      courseSelect.value = "";
      dateInput.value = "";
      errorEl.textContent = "";
      errorEl.style.display = "none";

      renderPlanner();
      showPlannerToast("Successfully added", "add");
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.getAttribute("data-filter") || "all";
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderPlanner();
    });
  });

  renderPlanner();
});
