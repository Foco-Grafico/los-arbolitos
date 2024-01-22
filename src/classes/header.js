export default class ClassHeader {
  constructor ({ report }) {
    this.report = report
  }

  render () {
    return `
          <header class="flex">
              <div class="flex flex-col flex-grow justify-end pb-4">
                  <h1 class="border-b border-black text-2xl font-black">
                      REPORTE DE <span style="color: #fbbd01;">${this.report}</span>
                  </h1>
              </div>
          </header>
          `
  }
}
