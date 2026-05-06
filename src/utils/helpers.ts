export class Helper{
  static makeSlugFromString(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace('đ', 'd').replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  }
}

export default Helper;