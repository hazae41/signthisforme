function createNonCompliantLineEndingBlank() {
  return {
    type: "nonCompliantLineEndingBlank",
    value: "",
    data: {},
    children: []
  }
}

function onEnter(this: any, token: any) {
  this.enter(createNonCompliantLineEndingBlank(), token);
}

function onExit(this: any, token: any) {
  this.exit(token);
}

const newlines = {
  enter: {
    lineEndingBlank: onEnter
  },
  exit: {
    lineEndingBlank: onExit
  }
};

export function remarkNewlines(this: any) {
  const data = this.data();

  function add(field: any, value: any) {
    const list = data[field] ? data[field] : (data[field] = []);

    list.push(value);
  }

  add("fromMarkdownExtensions", newlines);
}

