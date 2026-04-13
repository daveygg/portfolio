import { Button } from "@/components/ui/button";

export default function Subscribe() {
    return (
        <section className="flex flex-col p-4 border-border border rounded-2xl overflow-hidden">
            <h2 className="text-xl font-extrabold! font-chirp-bold">Subscribe</h2>
            <p className="py-1">Subscribe to unlock new features!</p>
            <Button className="bg-social-media-primary w-fit rounded-full font-bold hover:bg-social-media-primary/90 hover:cursor-pointer">Subscribe</Button>     
        </section>
    )
}