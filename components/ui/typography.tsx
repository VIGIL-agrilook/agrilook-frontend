import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// 반응형 제목 컴포넌트들
export function ResponsiveH1({ children, className, as: Component = 'h1', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-4xl font-bold tracking-tight',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

export function ResponsiveH2({ children, className, as: Component = 'h2', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-3xl font-semibold tracking-tight',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

export function ResponsiveH3({ children, className, as: Component = 'h3', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-2xl font-semibold tracking-tight',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

export function ResponsiveH4({ children, className, as: Component = 'h4', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-xl font-medium tracking-tight',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

export function ResponsiveH5({ children, className, as: Component = 'h5', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-lg font-medium tracking-tight',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

export function ResponsiveH6({ children, className, as: Component = 'h6', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-base font-medium tracking-tight',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

// 반응형 텍스트 컴포넌트들
export function ResponsiveP({ children, className, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-base leading-relaxed',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

export function ResponsiveLarge({ children, className, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-lg leading-relaxed',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

export function ResponsiveSmall({ children, className, as: Component = 'small', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-sm leading-relaxed',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

export function ResponsiveMuted({ children, className, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-base text-muted-foreground leading-relaxed',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

// 반응형 링크 컴포넌트
export function ResponsiveLink({ children, className, as: Component = 'a', ...props }: TypographyProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Component 
      className={cn(
        'text-fluid-base text-primary underline-offset-4 hover:underline',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

// 반응형 코드 컴포넌트
export function ResponsiveCode({ children, className, as: Component = 'code', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-sm relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

// 반응형 인용구 컴포넌트
export function ResponsiveBlockquote({ children, className, as: Component = 'blockquote', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-lg mt-6 border-l-2 pl-6 italic',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

// 반응형 리스트 컴포넌트
export function ResponsiveList({ children, className, as: Component = 'ul', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-base my-6 ml-6 list-disc [&>li]:mt-2',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

export function ResponsiveOrderedList({ children, className, as: Component = 'ol', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-base my-6 ml-6 list-decimal [&>li]:mt-2',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

// 반응형 리드 컴포넌트 (큰 텍스트)
export function ResponsiveLead({ children, className, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(
        'text-fluid-xl text-muted-foreground',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}
