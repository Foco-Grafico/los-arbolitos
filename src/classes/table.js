const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

export default class ReportTable {
  header = ['X', 'CANTIDAD', 'TOTAL']
  main = ['FOLIO', 'FECHA', 'MESERO']

  constructor ({ items, header, total }) {
    this.items = items
    this.header = header
    this.total = total
  }

  getHTMLTable () {
    return `
        <table class="w-full">
            <thead>
                <tr style='justify-between flex flex-col'>
                ${this.header[0] && this.header.map(x => `
                    <th class="font-black text-xl px-1">
                        <div style='background-color: #462f27;' >
                            <span style='color:white'>${x}</span>
                        </div>
                    </th>
                    `).join('')}
                </tr>
            </thead>
            <tbody>
                ${this.items[0] && this.items.map(x => `
                <tr>
                    <tr>
                        <td class="px-1">
                            <div class="px-6 bg-slate-200">
                                ${x.name}
                            </div>
                                ${x?.supplies.map(supply => {
                                    return `
                                        <div style="margin-left: 5px;" class="px-6 bg-slate-200">
                                            - ${supply?.name} ${priceFormatter.format(supply?.extra_cost)}
                                        </div>
                                        `
                                }).join('')}
                        </td>
                        <td class="px-1">
                                <div class="px-6 bg-slate-200">
                                        ${priceFormatter.format(x?.price)}
                                </div>
                        </td>
                    </tr>
                </tr>
                `).join('')}
                <tr>
                    <td class="px-1">
                        <div style='background-color:  #005942;' class=" flex flex-col px-3 rounded font-black h-12 justify-center">
                            <span style='color:white'>TOTAL ORDEN</span>
                        </div>
                    </td>
                    <td class="px-1">
                        <div style='background-color: #005942;' class=" bg-black flex justify-center items-center px-10 rounded h-12">
                        <span style='color:white'>${priceFormatter.format(this.total)}</span>
                        </div>
                    </td>
                </tr>
            </tbody>
          </table>
      `
  }
}
