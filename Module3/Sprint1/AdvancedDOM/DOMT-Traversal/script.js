const item2 = document.getElementById('item2');

item2.addEventListener('click', () => {
  const parent = item2.parentNode;
  alert(parent.textContent);

  const prevSibling = item2.previousElementSibling;
  const nextSibling = item2.nextElementSibling;

  if (prevSibling) {
    console.log("Previous Sibling:", prevSibling.textContent);
  }

  if (nextSibling) {
    console.log("Next Sibling:", nextSibling.textContent);
  }
});
