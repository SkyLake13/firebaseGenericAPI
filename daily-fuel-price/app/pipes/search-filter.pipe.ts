import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "search"})
export class SearchFilterPipe implements PipeTransform {
  transform(items: Array<string>, search: string): Array<string> {
    if (!items) { return []; }
    if (!search) { return items; }
    search = search.toLowerCase();

    return items.filter((it) => {
        return it.toLowerCase().includes(search);
    });
  }
}