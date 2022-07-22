<script lang='ts'>
    import brands from '$lib/images/brands.svg';
</script>

<div class="bg-white border-r border-gray-300 h-screen w-64">
    <div class="p-5 border-b border-gray-300 flex flex-cols-2 justify-left items-center gap-5 h-20 text-gray-900 font-normal">
        <img class="object-cover w-10 h-9" src={brands} alt="Brands" />
        <a href="/">
            <span class="font-bold"> ONE_SKA </span>
        </a>
    </div>
    <slot/>
</div>