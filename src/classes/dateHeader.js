export default class DateHeader {
  constructor ({ report, initialDate, finalDate, logo }) {
    this.report = report
    this.initialDate = initialDate
    this.finalDate = finalDate
    this.logo = logo
  }

  render () {
    return `
          <header class="flex">
              <div class="flex flex-col flex-grow justify-end pb-4">
                  <h1 class="border-b border-black text-2xl font-black">
                      REPORTE DE <span style="color: #fbbd01;">${this.report}</span>
                  </h1>
                  <span class="">
                      del <span class="font-black">${this.initialDate}</span> al <span class="font-black">${this.finalDate}</span>
                  </span>
              </div>
          </header>
          `
  }
}
