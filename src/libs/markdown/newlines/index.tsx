export function remarkNewlines(this: any) {
  const data = this.data();
  const list = (data.fromMarkdownExtensions ??= []);

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

  list.push({
    enter: {
      lineEndingBlank: onEnter
    },
    exit: {
      lineEndingBlank: onExit
    }
  })
}

