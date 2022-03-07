import _ from "lodash";

export function properties<
  GElement extends d3.BaseType,
  Datum,
  PElement extends d3.BaseType,
  PDatum
>(
  selection: d3.Selection<GElement, Datum, PElement, PDatum>,
  properties: {
    [key: string]: any;
  }
) {
  _.each(properties, (value, key) => {
    selection.property(key, value);
  });

  return selection;
}

export function eachs<
  GElement extends d3.BaseType,
  Datum,
  PElement extends d3.BaseType,
  PDatum
>(
  selection: d3.Selection<GElement, Datum, PElement, PDatum>,
  eachs: d3.ValueFn<GElement, Datum, void>[]
) {
  eachs.forEach((each) => {
    selection.each(each);
  });
}

type Call<
  GElement extends d3.BaseType,
  Datum,
  PElement extends d3.BaseType,
  PDatum
> = (
  selection: d3.Selection<GElement, Datum, PElement, PDatum>,
  ...args: any[]
) => void;
type Calls<
  GElement extends d3.BaseType,
  Datum,
  PElement extends d3.BaseType,
  PDatum
> = (
  | Call<GElement, Datum, PElement, PDatum>
  | [Call<GElement, Datum, PElement, PDatum>, ...any[]]
)[];

export function calls<
  GElement extends d3.BaseType,
  Datum,
  PElement extends d3.BaseType,
  PDatum
>(
  selection: d3.Selection<GElement, Datum, PElement, PDatum>,
  calls: Calls<GElement, Datum, PElement, PDatum>
) {
  calls.forEach((call) => {
    if (Array.isArray(call)) selection.call(...call);
    else selection.call(call);
  });
  return selection;
}

export function styles<
  GElement extends d3.BaseType,
  Datum,
  PElement extends d3.BaseType,
  PDatum
>(
  selection: d3.Selection<GElement, Datum, PElement, PDatum>,
  styles: { [k: string]: any }
) {
  _.each(styles, (value, key) => {
    selection.style(key, value);
  });
  return selection;
}

export function attrs<
  GElement extends d3.BaseType,
  Datum,
  PElement extends d3.BaseType,
  PDatum
>(
  selection: d3.Selection<GElement, Datum, PElement, PDatum>,
  attributes: { [k: string]: any }
) {
  _.each(attributes, (value, key) => {
    selection.attr(key, value);
  });
  return selection;
}

type BuildOptions<
  GElement extends d3.BaseType,
  Datum,
  PElement extends d3.BaseType,
  PDatum
> = {
  classed: string;
  call:
    | Call<GElement, Datum, PElement, PDatum>
    | Calls<GElement, Datum, PElement, PDatum>;
  each: d3.ValueFn<GElement, Datum, void> | d3.ValueFn<GElement, Datum, void>[];
  style: { [k: string]: any };
  property: { [k: string]: any };
  [k: string]: any;
};
export function build<
  GElement extends d3.BaseType,
  Datum,
  PElement extends d3.BaseType,
  PDatum
>(
  {
    append,
    classed,
    text,
    style,
    call,
    property,
    each,
    ...attributes
  }: BuildOptions<GElement, Datum, PElement, PDatum>,
  group?: d3.Selection<GElement, Datum, PElement, PDatum>
) {
  function prepare(group: d3.Selection<GElement, Datum, PElement, PDatum>) {
    const _el = group.append(append).call(attrs, attributes);
    if (classed) {
      _el.classed(classed, true); // wip on this part i suppose
      console.warn("using classed is still WIP, it only enables classes");
    }
    if (text) _el.text(text);
    if (style) styles(_el, style);
    if (property) properties(_el, property);

    if (call) {
      if (Array.isArray(call)) calls(_el, call);
      else _el.call(call);
    }

    if (each) {
      if (Array.isArray(each)) eachs(_el, each);
      else _el.each(each);
    }

    return _el;
  }

  return group ? prepare(group) : prepare;
}

export const props = properties;
