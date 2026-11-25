import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { MenuItem } from '../models/MenuItem.js';
import { InventoryItem } from '../models/InventoryItem.js';
import { Order } from '../models/Order.js';
import { Reservation } from '../models/Reservation.js';
import { Setting } from '../models/Setting.js';
import { Notification } from '../models/Notification.js';

export const seedDatabase = async (): Promise<void> => {
  try {
    console.log('[Seed] Checking database collections...');

    // 1. Seed Users (Admin & Staff)
    const adminExists = await User.findOne({ email: 'admin@noirecafe.ch' });
    if (!adminExists) {
      await User.create({
        name: 'Élias Vonderau (Founder & Head Roaster)',
        email: 'admin@noirecafe.ch',
        password: 'NoireAdmin2026!',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      });
      console.log('[Seed] Admin user created: admin@noirecafe.ch / NoireAdmin2026!');
    }

    const staffExists = await User.findOne({ email: 'barista@noirecafe.ch' });
    if (!staffExists) {
      await User.create({
        name: 'Mia Vonderau (Lead Barista)',
        email: 'barista@noirecafe.ch',
        password: 'Barista2026!',
        role: 'staff',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      });
      console.log('[Seed] Staff user created: barista@noirecafe.ch / Barista2026!');
    }

    // 2. Seed Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.create([
        { id: 'all', name: 'All', label: 'All', order: 0 },
        { id: 'espresso', name: 'Espresso', label: 'Espresso', order: 1 },
        { id: 'signature', name: 'Signature Coffee', label: 'Signature Coffee', order: 2 },
        { id: 'cold-brew', name: 'Cold Brew', label: 'Cold Brew', order: 3 },
        { id: 'tea-matcha', name: 'Tea & Matcha', label: 'Tea & Matcha', order: 4 },
        { id: 'bakery', name: 'Bakery', label: 'Bakery', order: 5 },
        { id: 'desserts', name: 'Desserts', label: 'Desserts', order: 6 },
      ]);
      console.log('[Seed] Categories seeded.');
    }

    // 3. Seed Inventory Items
    let beansItem = await InventoryItem.findOne({ name: 'Single-Origin Reserve Beans' });
    if (!beansItem) {
      beansItem = await InventoryItem.create({
        name: 'Single-Origin Reserve Beans',
        category: 'Coffee Beans',
        currentStock: 45.5,
        unit: 'kg',
        minThreshold: 10.0,
        costPerUnitInr: 1200,
        supplier: 'Direct-Trade Colombia & Ethiopia Lots',
      });
      await InventoryItem.create([
        {
          name: 'Whole Pasture Milk',
          category: 'Dairy & Plant Milk',
          currentStock: 35.0,
          unit: 'L',
          minThreshold: 8.0,
          costPerUnitInr: 75,
          supplier: 'Alpine Dairy Farm',
        },
        {
          name: 'Barista Oat Milk',
          category: 'Dairy & Plant Milk',
          currentStock: 4.5, // Low stock on purpose for testing alert!
          unit: 'L',
          minThreshold: 10.0,
          costPerUnitInr: 180,
          supplier: 'Oatly Barista Edition',
        },
        {
          name: 'House Salted Caramel Syrup',
          category: 'Syrups & Botanicals',
          currentStock: 6.2,
          unit: 'L',
          minThreshold: 3.0,
          costPerUnitInr: 450,
          supplier: 'In-House Small Batch',
        },
        {
          name: 'Ceremonial Uji Matcha Powder',
          category: 'Tea & Matcha',
          currentStock: 2.8,
          unit: 'kg',
          minThreshold: 1.0,
          costPerUnitInr: 4200,
          supplier: 'Kyoto Tencha Producers Co-op',
        },
        {
          name: 'Valrhona 70% Dark Chocolate',
          category: 'Bakery & Flour',
          currentStock: 12.0,
          unit: 'kg',
          minThreshold: 4.0,
          costPerUnitInr: 1600,
          supplier: 'Valrhona France',
        },
        {
          name: 'Artisan Laminated Croissant Dough',
          category: 'Bakery & Flour',
          currentStock: 60,
          unit: 'pcs',
          minThreshold: 20,
          costPerUnitInr: 45,
          supplier: 'NOIRÉ Bakehouse Level 0',
        },
        {
          name: 'Takeaway Recycled Coffee Cups',
          category: 'Packaging',
          currentStock: 250,
          unit: 'units',
          minThreshold: 50,
          costPerUnitInr: 8,
          supplier: 'EcoKraft Zurich',
        },
      ]);
      console.log('[Seed] Inventory items seeded.');
    }

    // 4. Seed Menu Items
    const menuCount = await MenuItem.countDocuments();
    if (menuCount === 0 && beansItem) {
      await MenuItem.create([
        {
          id: 'esp-1',
          name: 'Espresso',
          category: 'espresso',
          description: 'Rich single-origin extraction with dense hazelnut crema, caramel sweetness and a pristine clean finish.',
          price: '₹100',
          priceInr: 100,
          origin: 'Huila, Colombia & Brazil Micro-Blend',
          elevation: '1,750m',
          process: 'Washed / Pulped Natural',
          notes: ['Dark Cacao', 'Toasted Hazelnut', 'Caramel'],
          image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
          badge: 'House Espresso',
          temperature: 'Hot',
          recipeIngredients: [{ ingredientId: beansItem._id, name: beansItem.name, quantity: 0.018, unit: 'kg' }],
        },
        {
          id: 'esp-2',
          name: 'Americano',
          category: 'espresso',
          description: 'Double espresso pulled over hot structured mineral water, offering crisp clarity and stone fruit aromatics.',
          price: '₹130',
          priceInr: 130,
          origin: 'Guatemala Huehuetenango',
          elevation: '1,650m',
          process: 'Washed',
          notes: ['Stone Fruit', 'Dark Cocoa', 'Crisp Clean'],
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
          temperature: 'Hot',
          recipeIngredients: [{ ingredientId: beansItem._id, name: beansItem.name, quantity: 0.018, unit: 'kg' }],
        },
        {
          id: 'esp-3',
          name: 'Cappuccino',
          category: 'espresso',
          description: 'Equal parts single-origin espresso, silky steamed pasture milk, and dense micro-foam with subtle cacao dusting.',
          price: '₹160',
          priceInr: 160,
          origin: 'Kenya Nyeri AA',
          elevation: '1,900m',
          process: 'Double Washed',
          notes: ['Velvet Foam', 'Caramelized Sugar', 'Milk Chocolate'],
          image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
          badge: 'Barista Choice',
          temperature: 'Hot',
          recipeIngredients: [{ ingredientId: beansItem._id, name: beansItem.name, quantity: 0.018, unit: 'kg' }],
        },
        {
          id: 'esp-4',
          name: 'Café Latte',
          category: 'espresso',
          description: 'Smooth double espresso married with silky steamed whole or oat milk textured to an exact 60°C with free-pour latte art.',
          price: '₹170',
          priceInr: 170,
          origin: 'Panama Boquete',
          elevation: '1,800m',
          process: 'Yellow Honey',
          notes: ['Sweet Cream', 'Vanilla Note', 'Mild Nutmeg'],
          image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
          temperature: 'Both',
          recipeIngredients: [{ ingredientId: beansItem._id, name: beansItem.name, quantity: 0.018, unit: 'kg' }],
        },
        {
          id: 'sig-1',
          name: 'Caramel Latte',
          category: 'signature',
          description: 'Espresso infused with house-cooked smoked sea-salt caramel reduction and textured velvety oat milk.',
          price: '₹190',
          priceInr: 190,
          notes: ['Salted Caramel', 'Warm Toffee', 'Vanilla Pod'],
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
          badge: 'NOIRÉ Icon',
          temperature: 'Both',
          recipeIngredients: [{ ingredientId: beansItem._id, name: beansItem.name, quantity: 0.018, unit: 'kg' }],
        },
        {
          id: 'sig-2',
          name: 'Vanilla Cold Coffee',
          category: 'signature',
          description: 'Slow-chilled double espresso shaken with pure Tahitian vanilla bean reduction and aerated sweet cream over ice.',
          price: '₹180',
          priceInr: 180,
          notes: ['Madagascar Vanilla', 'Chilled Cream', 'Silky Sweet'],
          image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
          badge: 'Summer Special',
          temperature: 'Iced',
          recipeIngredients: [{ ingredientId: beansItem._id, name: beansItem.name, quantity: 0.018, unit: 'kg' }],
        },
        {
          id: 'sig-3',
          name: 'Mocha',
          category: 'signature',
          description: 'Single-origin espresso blended with 70% dark Valrhona melted chocolate ganache and velvety textured milk.',
          price: '₹200',
          priceInr: 200,
          notes: ['Dark Valrhona', 'Espresso Crema', 'Cacao Dust'],
          image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
          temperature: 'Both',
          recipeIngredients: [{ ingredientId: beansItem._id, name: beansItem.name, quantity: 0.018, unit: 'kg' }],
        },
        {
          id: 'sig-4',
          name: 'Hazelnut Latte',
          category: 'signature',
          description: 'Double espresso folded with stone-ground roasted Piedmont hazelnut praline syrup and micro-foamed milk.',
          price: '₹210',
          priceInr: 210,
          notes: ['Roasted Praline', 'Brown Butter', 'Silky Cream'],
          image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&w=800&q=80',
          badge: 'Guest Favorite',
          temperature: 'Both',
          recipeIngredients: [{ ingredientId: beansItem._id, name: beansItem.name, quantity: 0.018, unit: 'kg' }],
        },
        {
          id: 'cb-1',
          name: 'Classic Cold Brew',
          category: 'cold-brew',
          description: 'Steeped for 20 hours in pure alpine spring water for an ultra-smooth, naturally sweet profile with near-zero acidity.',
          price: '₹180',
          priceInr: 180,
          notes: ['Dark Chocolate', 'Wild Strawberry', 'Molasses Body'],
          image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
          badge: '20-Hr Steep',
          temperature: 'Iced',
          recipeIngredients: [{ ingredientId: beansItem._id, name: beansItem.name, quantity: 0.025, unit: 'kg' }],
        },
        {
          id: 'cb-2',
          name: 'Orange Cold Brew',
          category: 'cold-brew',
          description: 'Crisp cold brew concentrate charged with freshly expressed Valencia orange zest and effervescent botanical tonic.',
          price: '₹220',
          priceInr: 220,
          notes: ['Citrus Zest', 'Candied Orange', 'Sparkling Tonic'],
          image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=800&q=80',
          badge: 'Botanical',
          temperature: 'Iced',
          recipeIngredients: [{ ingredientId: beansItem._id, name: beansItem.name, quantity: 0.025, unit: 'kg' }],
        },
        {
          id: 'cb-3',
          name: 'Iced Americano',
          category: 'cold-brew',
          description: 'Double shot of high-elevation espresso poured over glacial crystal ice and chilled structured mineral water.',
          price: '₹150',
          priceInr: 150,
          notes: ['Crisp Clean', 'Caramelized Crema', 'Light Citrus'],
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
          temperature: 'Iced',
          recipeIngredients: [{ ingredientId: beansItem._id, name: beansItem.name, quantity: 0.018, unit: 'kg' }],
        },
        {
          id: 'tm-1',
          name: 'Matcha Latte',
          category: 'tea-matcha',
          description: 'Ceremonial first-harvest shade-grown tencha ground on granite wheels in Uji, Kyoto. Whisked table-side with textured oat milk.',
          price: '₹220',
          priceInr: 220,
          notes: ['Ceremonial Uji', 'Sweet Grass', 'Velvet Umami'],
          image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
          badge: 'Uji Ceremonial',
          temperature: 'Both',
        },
        {
          id: 'tm-2',
          name: 'Classic Green Tea',
          category: 'tea-matcha',
          description: 'Single-estate whole leaf green tea harvested in early spring mist. Steeped at 78°C for delicate floral clarity.',
          price: '₹120',
          priceInr: 120,
          notes: ['Spring Dew', 'Steamed Sencha', 'Floral Finish'],
          image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
          temperature: 'Hot',
        },
        {
          id: 'tm-3',
          name: 'Masala Chai',
          category: 'tea-matcha',
          description: 'Full-bodied organic Assam orthodox black tea slow-simmered with freshly stone-crushed green cardamom, ginger, cloves and milk.',
          price: '₹90',
          priceInr: 90,
          notes: ['Fresh Cardamom', 'Warm Ginger', 'Spiced Assam'],
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
          badge: 'Traditional Spiced',
          temperature: 'Hot',
        },
        {
          id: 'bak-1',
          name: 'Butter Croissant',
          category: 'bakery',
          description: 'Laminated with churned French pasture butter for honeycomb layers, a delicate flaky exterior and melt-in-mouth crumb.',
          price: '₹140',
          priceInr: 140,
          notes: ['Pure Churned Butter', 'Flaky Layers', 'Golden Crust'],
          image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
          badge: 'Fresh Baked 07:00',
        },
        {
          id: 'bak-2',
          name: 'Chocolate Croissant',
          category: 'bakery',
          description: 'Golden flaky French pain au chocolat rolled with twin batons of bittersweet 64% dark Belgian chocolate.',
          price: '₹170',
          priceInr: 170,
          notes: ['64% Dark Belgian', 'Flaky Pastry', 'Warm Center'],
          image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=800&q=80',
          badge: 'Artisanal Batch',
        },
        {
          id: 'bak-3',
          name: 'Cinnamon Roll',
          category: 'bakery',
          description: 'Slow-proved enriched brioche dough swirled with aromatic Ceylon cinnamon and brown sugar, crowned with vanilla glaze.',
          price: '₹160',
          priceInr: 160,
          notes: ['Ceylon Cinnamon', 'Brown Sugar', 'Vanilla Glaze'],
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'des-1',
          name: 'Chocolate Brownie',
          category: 'desserts',
          description: 'Dense, fudgy dark chocolate square baked with roasted walnut pieces and accented with Maldon flaky sea salt.',
          price: '₹150',
          priceInr: 150,
          notes: ['Fudgy Cacao', 'Roasted Walnuts', 'Fleur de Sel'],
          image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
          badge: 'Fudgy Center',
        },
        {
          id: 'des-2',
          name: 'Cheesecake',
          category: 'desserts',
          description: 'Silky New York style baked cheesecake on a buttery spiced graham crust, finished with light citrus vanilla glaze.',
          price: '₹220',
          priceInr: 220,
          notes: ['Creamy Mascarpone', 'Graham Crust', 'Citrus Glaze'],
          image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
          badge: 'House Special',
        },
        {
          id: 'des-3',
          name: 'Tiramisu',
          category: 'desserts',
          description: 'Savoiardi ladyfingers drenched in 20-hour cold drip espresso and dark rum, layered with whipped mascarpone and Valrhona cacao.',
          price: '₹240',
          priceInr: 240,
          notes: ['House Cold Drip', 'Whipped Mascarpone', 'Valrhona Cacao'],
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
          badge: 'Signature Pairing',
        },
      ]);
      console.log('[Seed] Menu items seeded.');
    }

    // 5. Seed Initial Live Orders for Demonstration
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      await Order.create([
        {
          orderId: 'NC-20261125-1042',
          customer: {
            name: 'Aarav Mehta',
            email: 'aarav.mehta@example.com',
            phone: '+91 98201 12345',
            tableNumber: 'T-03',
            orderType: 'dine_in',
          },
          items: [
            { menuItemId: 'sig-1', name: 'Caramel Latte', priceInr: 190, quantity: 2, subtotalInr: 380 },
            { menuItemId: 'bak-1', name: 'Butter Croissant', priceInr: 140, quantity: 1, subtotalInr: 140 },
          ],
          subtotalInr: 520,
          taxInr: 26,
          discountInr: 0,
          totalInr: 546,
          status: 'preparing',
          payment: {
            method: 'razorpay',
            status: 'paid',
            razorpayPaymentId: 'pay_demo_seeded_001',
            paidAt: new Date(),
            amountInr: 546,
          },
          inventoryDeducted: true,
        },
        {
          orderId: 'NC-20261125-1088',
          customer: {
            name: 'Priya Sharma',
            email: 'priya.s@example.com',
            phone: '+91 98190 67890',
            tableNumber: 'T-01',
            orderType: 'dine_in',
          },
          items: [
            { menuItemId: 'cb-1', name: 'Classic Cold Brew', priceInr: 180, quantity: 1, subtotalInr: 180 },
            { menuItemId: 'des-2', name: 'Cheesecake', priceInr: 220, quantity: 1, subtotalInr: 220 },
          ],
          subtotalInr: 400,
          taxInr: 20,
          discountInr: 0,
          totalInr: 420,
          status: 'ready',
          payment: {
            method: 'razorpay',
            status: 'paid',
            razorpayPaymentId: 'pay_demo_seeded_002',
            paidAt: new Date(),
            amountInr: 420,
          },
          inventoryDeducted: true,
        },
      ]);
      console.log('[Seed] Sample orders seeded.');
    }

    // 6. Seed Sample Reservations
    const reservationCount = await Reservation.countDocuments();
    if (reservationCount === 0) {
      const todayStr = new Date().toISOString().slice(0, 10);
      await Reservation.create([
        {
          reservationCode: 'NCR-782104',
          customer: { name: 'Kavita Roy', email: 'kavita.roy@example.com', phone: '+91 98450 11223' },
          date: todayStr,
          timeSlot: '16:00',
          guestCount: 2,
          tableNumber: 'T-02',
          seatingArea: 'Courtyard Atrium',
          status: 'confirmed',
          specialRequests: 'Quiet corner table for design meeting.',
        },
        {
          reservationCode: 'NCR-941820',
          customer: { name: 'Vikram Joshi', email: 'v.joshi@example.com', phone: '+91 97230 44556' },
          date: todayStr,
          timeSlot: '18:00',
          guestCount: 4,
          tableNumber: 'T-04',
          seatingArea: 'Main Hall',
          status: 'pending',
          specialRequests: 'Celebrating anniversary, requested quiet area.',
        },
      ]);
      console.log('[Seed] Sample reservations seeded.');
    }

    // 7. Seed Settings
    const settingsCount = await Setting.countDocuments();
    if (settingsCount === 0) {
      await Setting.create([
        { key: 'cafeName', value: 'NOIRÉ Café' },
        { key: 'tagline', value: 'A Slower Kind of Everyday.' },
        { key: 'taxRatePercent', value: 5 },
        { key: 'currency', value: 'INR' },
        { key: 'currencySymbol', value: '₹' },
        { key: 'storeStatus', value: 'open' },
        { key: 'razorpayTestMode', value: true },
        { key: 'emailNotifications', value: true },
      ]);
      console.log('[Seed] Initial settings seeded.');
    }

    // 8. Seed Initial Notification
    const notifCount = await Notification.countDocuments();
    if (notifCount === 0) {
      await Notification.create({
        title: 'NOIRÉ Café 2.0 Business Platform Activated',
        message: 'Full-stack platform initialized with real-time orders, Razorpay integration, and inventory tracking.',
        type: 'system',
        targetRole: 'all',
      });
    }

    console.log('[Seed] Database initialization complete!');
  } catch (err: any) {
    console.error('[Seed Error]:', err.message);
  }
};
