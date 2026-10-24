import {PortableText, type PortableTextBlock, type PortableTextComponents} from '@portabletext/react';
const components:Partial<PortableTextComponents>={
 block:{
 normal:({children})=><p className="my-4 leading-relaxed text-foreground">{children}</p>,
 h1:({children})=><h1 className="mt-8 mb-4 text-2xl font-semibold tracking-tight text-heading">{children}</h1>,
 h2:({children})=><h2 className="mt-6 mb-3 text-xl font-semibold tracking-tight text-heading">{children}</h2>,
 h3:({children})=><h3 className="mt-4 mb-2 text-lg font-medium text-heading">{children}</h3>,
 blockquote:({children})=><blockquote className="my-4 border-l-2 border-border pl-4 text-muted italic">{children}</blockquote>,
 },
 list:{bullet:({children})=><ul className="my-4 ml-6 list-disc space-y-2 text-foreground">{children}</ul>,number:({children})=><ol className="my-4 ml-6 list-decimal space-y-2 text-foreground">{children}</ol>},
 marks:{link:({value,children})=><a href={/^(https?:\/\/|mailto:|\/|#)/.test(value?.href||'')?value.href:undefined} className="underline underline-offset-4 transition-colors hover:text-heading" {...(value?.href?.startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{children}</a>}
};
export function RichText({value}:{value:PortableTextBlock[]}){return <PortableText value={value} components={components}/>}
