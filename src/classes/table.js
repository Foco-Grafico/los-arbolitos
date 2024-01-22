export default class ReportTable {
  header = ['X', 'CANTIDAD', 'TOTAL']

  constructor ({ items, header, total }) {
    this.items = items
    this.header = header
    this.total = total
  }

  getHTMLTable () {
    return `
          <table class="w-full">
              <thead>
                  <tr>
                     ${this.header[0] && this.header.map(x => `
                          <th class="font-black text-xl px-1">
                               <div style='background-color: #fdbe01;' >
                                  ${x}
                              </div>
                          </th>
                      `).join('')}
                      </tr>
              </thead>
              <tbody>
                  ${this.items[0] && this.items.map(x => `
                      <tr>
                          <td class="px-1">
                              <div class="px-6 bg-slate-200">
                                  ${x.name}
                              </div>
                                    ${this?.items[0]?.supplies_modified && Object.keys(x?.supplies_modified).map(key => {
                                        return x?.supplies_modified[key].map(supply => {
                                            return (`
                                                <div class="px-6 bg-slate-200">
                                                    ${supply?.name}
                                                </div>
                                                <div class="px-6 bg-slate-200">
                                                    ${supply?.price}
                                                </div>
                                                `)
                                        }).join('')
                                    }).join('')}
                                        </td>
                            <td class="px-1">
                                    <div class="px-6 bg-slate-200">
                                            ${x?.price}
                                    </div>
                            </td>
                      </tr>
                  `).join('')}
                   <tr>
                      <td class="px-1"/>
                      <td class="px-1">
                              <div style='background-color:  #fbbd01;' class=" flex flex-col px-3 rounded font-black h-12 justify-center">
                                  <span>TOTAL</span>
                                  <span>${this.header[0]}</span>
                              </div>
                      </td>
                      <td class="px-1">
                              <div style='color: #fbbd01;' class=" bg-black flex justify-center items-center px-10 rounded h-12">
                              ${this.total}
                              </div>
                      </td>
                  </tr>
              </tbody>
          </table>
      `
  }
}
